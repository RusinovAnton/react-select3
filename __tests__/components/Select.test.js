import Select from "../../src/components/Select";

describe("Shallow <Select/>", () => {
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
  it("should not render search input when there is no options", () => {
    const component = mount(<Select search={{ minimumResults: 0 }} />);

    component.setState({ dropdownOpened: true });
    expect(component.find(cssName + "__search-field").length).toBe(0);
  });

  it("should not render a Select clear button without choosen option and should render it on option select", () => {
    const component = mount(
      <Select
        allowClear
        defaultValue={3}
        options={mock.options}
        onSelect={jest.fn()}
      />
    );

    expect(component.find(cssName + "__clear-selection").length).toBe(1);

    component.setProps({ value: null });
    expect(component.find(cssName + "__clear-selection").length).toBe(0);
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
    expect(component.find(".TestSelector__container").length).toBe(1);
    expect(component.find(".TestSelector__selection").length).toBe(1);

    component.setState({ dropdownOpened: true });
    expect(component.find(".TestSelector__dropdown").length).toBe(1);
  });

  it("should use optionRenderer if passed to render SelectOptionsList", () => {
    const spy = sinon.spy(mock, "renderer");
    const component = mount(
      <Select optionRenderer={mock.renderer} options={mock.options} />
    );

    component.setState({ dropdownOpened: true });
    expect(spy.callCount).toBe(mock.options.length);
  });

  it("should render SelectDropdown with SelectSearchInput", () => {
    const component = mount(
      <Select
        search={{ minimumResults: 5 }}
        optionRenderer={mock.renderer}
        options={mock.options}
      />
    );

    component.setState({ dropdownOpened: true });
    expect(component).toMatchSnapshot();
  });

  it("should filter options on SelectSearchInput change value", () => {
    const component = mount(
      <Select
        search={{ minLength: 1, minimumResults: 5 }}
        optionRenderer={mock.renderer}
        options={mock.options}
      />
    );

    component.setState({ dropdownOpened: true });
    const searchField = component.find(cssName + "__search-field");

    searchField.instance().value = "t";
    searchField.simulate("change", searchField);

    expect(component.find(cssName + "__option").length).toBe(4);
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

    expect(component.find(cssName + "__error").length).toBe(1);
  });

  it("should update error node - remove when null passed into error prop", () => {
    component.setProps({ error: null });

    expect(component.find(cssName + "__error").length).toBe(0);
  });
});
