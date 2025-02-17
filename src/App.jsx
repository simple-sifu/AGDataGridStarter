  import { AgGridReact } from 'ag-grid-react';
  import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
  import { useRef, useState, useEffect } from 'react';

  // Register all Community features
  ModuleRegistry.registerModules([AllCommunityModule]);

  const CustomCheckboxRenderer = (props) => {
    const checkboxRef = useRef(null);
  
    useEffect(() => {
      if (checkboxRef.current) {
        if (props.data.status === "indeterminate") {
          checkboxRef.current.indeterminate = true;
        } else {
          checkboxRef.current.indeterminate = false;
          checkboxRef.current.checked = props.value;
        }
      }
    }, [props.value, props.data.status]);
  
    return (
      <input
        type="checkbox"
        ref={checkboxRef}
        checked={props.value}
        onChange={(e) => props.node.setSelected(e.target.checked)}
      />
    );
  };
  

const App = () => {

  const [gridApi, setGridApi] = useState(null);

  const gridRef = useRef(null);

  const rowData = [
    {         
      id: 1, 
      make: "Tesla", 
      model: "Model Y", 
      price: 64950, 
      electric: true, 
      selectable: true,
      status: "checked", 
      selected: true,
    },
    { 
      id: 2, 
      make: "Ford", 
      model: "F-Series", 
      price: 33850, 
      electric: false,  
      selectable: true,
      status: "unchecked", 
      selected: true,
    },
    { 
      id: 3, 
      make: "Toyota", 
      model: "Corolla", 
      price: 29600, 
      electric: false, 
      selectable: true,
      status: "indeterminate", 
      selected: true,
    },
  ];

  // Column Definitions: Defines the columns to be displayed.
  const columnDefs = [
      {
        headerCheckboxSelection: true, // Enables "Select All"
        checkboxSelection: true, // Enables row selection
        width: 50,
        field: "name",
        cellRendererFramework: CustomCheckboxRenderer, // Custom renderer for indeterminate state
      },
      { headerName: "Car Make", field: "make" },
      { headerName: "Car Model", field: "model" },
      { headerName: "Car Price", field: "price" },
      { headerName: "Car Type:", field: "electric" },
      { field: "status" }
  ];

  // Function to determine if a row is selectable
  const isRowSelectable = (params) => {
    return params.data.selectable; // Only rows where `selectable: true` will have an enabled checkbox
  };

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log("Selected Rows:", selectedRows);
  };


  const onGridReady = (params) => {
    setGridApi(params.api);

    setTimeout(() => {
      params.api.forEachNode((node) => {
        console.log("node =", node)
        if (node.data.status === "checked") {
          node.setSelected(true, false); // Fully checked
        } else if (node.data.status === "indeterminate") {
          node.setSelected(true, false); // Indeterminate state
        }
      });
    }, 100); // Slight delay to ensure the grid is ready
  };

  return (
    <div style={{ height: "1100px", width: "1100px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={onGridReady}
          getRowNodeId={(data) => {
            console.log("data.id.toString()=", data.id.toString())
            return data.id.toString()
          }} // Ensure unique row IDs
        />
    </div>
  );
};

export default App;


// isRowSelectable={isRowSelectable}
// onSelectionChanged={onSelectionChanged}
