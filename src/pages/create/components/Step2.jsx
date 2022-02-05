import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./StepStyles.module.css";
import { v4 as uuidv4 } from "uuid";
import { useMoralis } from "react-moralis";
const Step2 = ({ fields, setFields, quorum, setQuorum }) => {
  const [quorumOptions, setQuorumOptions] = useState([]);
  const {account } = useMoralis()

  
  useEffect(() => {
    handlePopulateSelectOptions();
  }, [fields]);

  const handlePopulateSelectOptions = () => {
    const options = [];
    fields.map((field, id) => {
      if (field.addr != "") {
        options.push(id + 1);
      }
    });
    setQuorumOptions(options);
  };

  const handleChange = (event, id) => {
    const { value, name } = event.target;
    console.log(id);
    const tempField = [...fields];
    const index = fields.findIndex((field) => {
      return field.id === id;
    });
    tempField[index].addr = value;
    setFields(tempField);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    if (name === "quorum") {
      setQuorum(value);
    }
  };

  const handleAddForm = () => {
    setFields([...fields, { addr: "", id: uuidv4() }]);
  };

  return (
    <div className={styles.step}>
      <div className={styles.step_heading}>
        <Typography>
          Your Safe will have one or more owners. We have prefilled the first
          owner with your connected wallet details, but you are free to change
          this to a different owner.
        </Typography>
      </div>
      <div className={styles.step_owners_content}>
        <div className={styles.owners_content_table}>
          <table>
            <thead>
              <td>ADDRESS</td>
              <td>ACTIONS</td>
            </thead>
            <tbody>
              {fields.map((field) => {
                return (
                  <tr key={field.id}>
                    <td>
                      <div className={styles.owner_addr}>
                        <input
                          value={field.addr}
                          onChange={(e) => {
                            handleChange(e, field.id);
                          }}
                          type="text"
                          placeholder="Owner address"
                        />
                      </div>
                    </td>
                    <td>
                      <div className={styles.owner_actions}></div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.add_owner_btn}>
          <button onClick={handleAddForm}>+ Add another owner</button>
        </div>
        <div className={styles.transaction_confirmation}>
          <label htmlFor="">
            Qourum
            <select onChange={handleSelectChange} value={quorum} name="quorum" id="">
              {quorumOptions.map((quo) => {
                return <option key={quo} value={quo}>{quo}</option>;
              })}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step2;
