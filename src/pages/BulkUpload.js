import { Button, Divider, FileInput, Flex, Title } from "@mantine/core";
import React from "react";
import CustomTable from "../components/CustomTable";
import * as XLSX from "xlsx/xlsx.mjs";

function BulkUpload() {
  const [data, setData] = React.useState(null);
  const [file, setFile] = React.useState(null);

  var ExcelToJSON = function () {
    this.parseExcel = function (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: "binary",
        });

        workbook.SheetNames.forEach(function (sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          var json_object = JSON.stringify(XL_row_object);
          // console.log(json_object);
          const data_obj = JSON.parse(json_object);
          setData(data_obj);
          console.log(data_obj);
        });
      };

      reader.onerror = function (ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };
  };
  var xl2json = new ExcelToJSON();
  return (
    <Flex gap="md" direction="column" wrap="wrap" sx={{ padding: 10 }}>
      <Title order={3}>Bulk Upload</Title>
      <Divider />
      <Flex gap="md" direction="row" wrap="wrap" sx={{ padding: 10 }}>
        <FileInput
          style={{ width: 200 }}
          placeholder="Upload Excel Data File"
          withAsterisk
          value={file}
          onChange={setFile}
          accept=".xlsx"
        />
        <Button onClick={() => xl2json.parseExcel(file)}>Upload</Button>
      </Flex>
      <Divider />
      <Title order={5}>Preview</Title>
      {data ? <CustomTable data={data} /> : "Upload a file"}
    </Flex>
  );
}

export default BulkUpload;
