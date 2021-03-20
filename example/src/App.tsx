import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { DatePicker, message } from 'antd';
import SayHello from "antd-easy-crop";
function App() {
    const [date, setDate] = useState();
    const handleChange = (value: any) => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setDate(value);
    };
  return (
      <div className="App">
          <div style={{ width: 400, margin: '100px auto' }}>
              <DatePicker onChange={handleChange} />
              <div style={{ marginTop: 16 }}>
                  {/*Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}*/}
              </div>
          </div>
          <SayHello name="Prateek" />
      </div>
  );
}

export default App;
