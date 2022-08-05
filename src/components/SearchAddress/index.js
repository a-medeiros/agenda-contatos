import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './styles.css';

export default function SearchAddress({ cep, setCep, wantedAddress, setWantedAddress }) {
  function getAddressByCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        setWantedAddress(`${data.logradouro}, ${data.localidade}, ${data.uf}`)
        setCep('');
      });
  }

  return (
    <>
      <p className="text">Não sabe o endereço? Digite o CEP e descubra:</p>
      <div className="container-cep">
        <Input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="CEP" />
        <Button type="primary" icon={<SearchOutlined />} onClick={() => getAddressByCEP(cep)} />
      </div>
      {wantedAddress && (
        <p className="text">O endereço é: <strong>{wantedAddress}</strong></p>
      )}
    </>
  )
}