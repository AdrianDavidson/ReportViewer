import AllReports from "./Components/AllReports";
import "./App.css";

function App() {
  return (
    <>
      <div class="container mb-3 mt-3 mx-auto">
        <div class="flex flex-col text-center w-full mb-3">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            My Report Viewer App
          </h1>
        </div>
      </div>
      <AllReports></AllReports>
    </>
  );
}

export default App;
