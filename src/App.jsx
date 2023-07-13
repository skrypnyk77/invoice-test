import Typography from "@mui/material/Typography";

import InvoiceList from "./components/InvoiceList";

function App() {
  return (
    <div className="App">
      <Typography align="center" variant="h2" gutterBottom>
        Invoice List
      </Typography>

      <InvoiceList />
    </div>
  );
}

export default App;
