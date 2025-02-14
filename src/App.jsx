  import { AgGridReact } from 'ag-grid-react';
  import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
  import { useState, useRef } from 'react';

  // Register all Community features
  ModuleRegistry.registerModules([AllCommunityModule]);


const App = () => {

  const gridRef = useRef(null);

  const [rowData, setRowData] = useState([
    {         
      id: 1, 
      make: "Tesla", 
      model: "Model Y", 
      price: 64950, 
      electric: true, 
      selectable: true 
    },
    { 
      id: 2, 
      make: "Ford", 
      model: "F-Series", 
      price: 33850, 
      electric: false,  
      selectable: true 
    },
    { 
      id: 3, 
      make: "Toyota", 
      model: "Corolla", 
      price: 29600, 
      electric: false, 
      selectable: true  
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState([
      {
        headerCheckboxSelection: true, // Enables "Select All"
        checkboxSelection: true, // Enables row selection
        width: 50,
      },
      { headerName: "Car Make", field: "make" },
      { headerName: "Car Model", field: "model" },
      { headerName: "Car Price", field: "price" },
      { headerName: "Car Type:", field: "electric" }
  ]);

  // Function to determine if a row is selectable
  const isRowSelectable = (params) => {
    return params.data.selectable; // Only rows where `selectable: true` will have an enabled checkbox
  };

  return (
    <div style={{ height: "1100px", width: "1100px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          isRowSelectable={isRowSelectable}
        />
    </div>
  );
};

export default App;
