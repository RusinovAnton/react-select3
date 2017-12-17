import Select from "../../src/components/Select";

describe("Shallow <Select/>", () => {
  beforeEach(() => {
    mock.options = [
      { id: 3, text: 'three' },
      { id: 4, text: 'four' },
      { id: 5, text: 'five' },
      { id: 6, text: 'six' },
      { id: 7, text: 'seven' },
      { id: 8, text: 'eight' },
      { id: 9, text: 'nine' },
      { id: 10, text: 'ten' },
      { id: 11, text: 'eleven' },
      { id: 12, text: 'twelve' },
    ];
  });

  it("should render with options in the state", () => {
    const component = shallow(<Select options={mock.options} />);

    expect(component.state("options")).toHaveLength(10);
  });

  it("should save options' object structure", () => {
    const optionsList = mock.options.map(option => ({
      additionalKey: true,
      ...option
    }));
    const component = shallow(<Select options={optionsList} />);

    expect(
      component.state("options").every(option => option.additionalKey)
    ).toBe(true);
  });

  it("should update state.value when new value after props update", () => {
    const component = shallow(
      <Select value={3} options={mock.options} onSelect={jest.fn()} />
    );

    component.setProps({ value: 4 });
    expect(component.state("value")).toBe("4");
  });
});

describe("Render <Select/>", () => {
  it("should render a Select with default props", () => {
    const component = render(<Select />);

    expect(component).toMatchSnapshot();
  });
});

describe("Mount <Select/>", () => {
  it("should not render a Select clear button without choosen option and should render it on option select", () => {
    const component = mount(
      <Select
        allowClear
        defaultValue={3}
        options={mock.options}
        onSelect={jest.fn()}
      />
    );

    expect(component.find(cssName + "__clear-selection")).toHaveLength(1);
    component.setProps({ value: null });
    expect(component.find(cssName + "__clear-selection")).toHaveLength(0);
  });

  it("should open dropdown on when state.dropdownOpened = true", () => {
    const component = mount(<Select options={mock.options} />);

    expect(component.setState({ dropdownOpened: true })).toMatchSnapshot();
  });

  it("should render Select with default option and show placeholder after reseting value", () => {
    const component = mount(
      <Select
        placeholder="Select something"
        defaultValue={3}
        options={mock.options}
      />
    );

    const selection = component.find(cssName + "__selection-text");
    expect(selection.text()).toBe("three");

    component.instance().onClearSelection();
    expect(selection.text()).toBe("Select something");
  });

  it("should render a disabled unclickable Select with choosen option", () => {
    const makeClick = sinon.spy();
    const component = mount(
      <Select value={3} disabled={true} options={mock.options} />
    );

    expect(component).toMatchSnapshot();

    component.find(cssName + "__container").simulate("click");
    expect(makeClick.calledOnce).toBe(false);
  });

  it("should change css class name if prop passed", () => {
    const component = mount(<Select cssClassNamePrefix={"TestSelector"} />);

    expect(component).toMatchSnapshot();
    expect(component.find(".TestSelector__container")).toHaveLength(1);
    expect(component.find(".TestSelector__selection")).toHaveLength(1);

    component.setState({ dropdownOpened: true });
    expect(component.find(".TestSelector__dropdown")).toHaveLength(1);
  });

  it("should use optionRenderer if passed to render SelectOptionsList", () => {
    const spy = sinon.spy(mock, "renderer");
    const component = mount(
      <Select optionRenderer={mock.renderer} options={mock.options} />
    );

    component.setState({ dropdownOpened: true });
    expect(spy.callCount).toBe(mock.options.length);
  });

  describe('Search input', () => {
    const findSearchInput = wrapper => wrapper.find(cssName + "__search-field");

    it("renders when search.show prop is true", () => {
      const component = mount(
        <Select
          search={{ show: true }}
          optionRenderer={mock.renderer}
          options={mock.options}
        />
      );

      component.setState({ dropdownOpened: true });
      expect(findSearchInput(component)).toHaveLength(1);
    });

    it('does not render when there is no search.show is falsy', () => {
      const component = mount(
        <Select
          search={{minimumResults: mock.options - 1}}
          options={mock.options} />
      );

      component.setState({ dropdownOpened: true });
      expect(findSearchInput(component)).toHaveLength(0);
    });

    it("does not render when there is no options", () => {
      const component = mount(<Select search={{ show: true }} options={[]}/>);

      component.setState({ dropdownOpened: true });
      expect(findSearchInput(component)).toHaveLength(0);
    });

    it("should filter options on SelectSearchInput change value", () => {
      const component = mount(
        <Select
          search={{ show: true, minLength: 1 }}
          optionRenderer={mock.renderer}
          options={mock.options}
        />
      );

      component.setState({ dropdownOpened: true });
      const searchField = component.find(cssName + "__search-field");

      searchField.instance().value = "t";
      searchField.simulate("change", searchField);

      expect(component.find(cssName + "__option")).toHaveLength(4);
    });

    it('should not show search input when minimumResults value is more than options.length', () => {
      const component = mount(
        <Select
          search={{show: true, minimumResults: mock.options.length + 10}}
          options={mock.options}
        />
      );

      component.setState({ dropdownOpened: true });
      expect(findSearchInput(component)).toHaveLength(0);
    })
  });
});

describe("Control <Select/> with keyboard", () => {
  const component = mount(<Select options={mock.options} />);
  const selectContainer = component.find(cssName + "__container");

  it("should open dropdown onKeyDown with key ArrowUp, ArrowDown, Space, Enter and close on Esc", () => {
    selectContainer.simulate("keyDown", { keyCode: 32 });
    expect(component.state("dropdownOpened")).toBe(true);

    selectContainer.simulate("keyDown", { keyCode: 27 });
    expect(component.state("dropdownOpened")).toBe(false);

    selectContainer.simulate("keyDown", { keyCode: 38 });
    expect(component.state("dropdownOpened")).toBe(true);

    selectContainer.simulate("keyDown", { keyCode: 27 });
    expect(component.state("dropdownOpened")).toBe(false);

    selectContainer.simulate("keyDown", { keyCode: 13 });
    expect(component.state("dropdownOpened")).toBe(true);

    selectContainer.simulate("keyDown", { keyCode: 27 });
    expect(component.state("dropdownOpened")).toBe(false);
  });

  it("should highlight option with ArrowUp, ArrowDown and select it on Enter or Space", () => {
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 38 });
    expect(component.find(cssName + "__option--highlighted").text()).toBe(
      "four"
    );

    selectContainer.simulate("keyDown", { keyCode: 13 });
    expect(component.state("value")).toBe("4");

    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 38 });
    expect(component.find(cssName + "__option--highlighted").text()).toBe(
      "five"
    );

    selectContainer.simulate("keyDown", { keyCode: 32 });
    expect(component.state("value")).toBe("5");

    component.setState({ searchTerm: "t" });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 38 });
    expect(component.find(cssName + "__option--highlighted").text()).toBe(
      "eight"
    );

    selectContainer.simulate("keyDown", { keyCode: 13 });
    expect(component.state("value")).toBe("8");

    component.setState({ searchTerm: "ee" });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    selectContainer.simulate("keyDown", { keyCode: 38 });
    selectContainer.simulate("keyDown", { keyCode: 38 });
    selectContainer.simulate("keyDown", { keyCode: 40 });
    expect(component.find(cssName + "__option--highlighted").text()).toBe(
      "three"
    );

    selectContainer.simulate("keyDown", { keyCode: 13 });
    expect(component.state("value")).toBe("3");
  });
});

describe("Select error", () => {
  const component = mount(<Select />);

  it("should render error node if error were passed with props", () => {
    component.setProps({ error: "Test error" });

    expect(component.find(cssName + "__error")).toHaveLength(1);
  });

  it("should update error node - remove when null passed into error prop", () => {
    component.setProps({ error: null });

    expect(component.find(cssName + "__error")).toHaveLength(0);
  });
});
