import  { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [Value, setValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [Durum, setDurum] = useState(null);
  const [Nem, setNem] = useState(null);
  const [Status, setStatus] = useState(null);

  const Input = (ewriq) => {
    setValue(ewriq.target.value);
  };

  const Sumbit = () => {
    makeGetRequest();
  };

  const makeGetRequest = () => {
    axios.get(`http://localhost:8080/api/${Value}`)
      .then((response) => {
        setResponseData(response.data.name);
        setDurum(response.data.main.temp);
        setNem(response.data.main.humidity)
        setStatus(response.data.weather[0].main)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='full'>
      {responseData && (
        <div className='data'>
          <img className='resim' src={`http://localhost:8080/${Status}.png`} alt="Resim bulunamadı." />
          <pre className='derece'>{Durum}°C</pre>
          <pre className='sıcaklık'>Sıcaklık: {Durum}°C</pre>
          <pre className='nem' >Nem: {Nem}%</pre>
          <p className='shr'>Şehir: {responseData}</p>
        </div>
      )}

      <input
       className='sehir'
        type="text"
        value={Value}
        onChange={Input}
        placeholder="Şehir girin."
      />
      <button onClick={Sumbit}> 
      ☁
      </button>
    </div>
  );
};

export default App;
