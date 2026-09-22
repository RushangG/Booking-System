import { Button } from "primereact/button";

function App() {
  return (
    <>
      <div className="flex justify-content-center align-items-center min-h-screen">
        <div className="custom-card text-center">
          <h1 className="text-3xl font-bold mb-3">Hello React </h1>
          <p className="mb-4 text-color-secondary">PrimeFlex and SCSS</p>
          <Button label="Click Me" icon="pi pi-check">
            Click
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
