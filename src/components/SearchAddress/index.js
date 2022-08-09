import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './styles.css';

export default function SearchAddress({
  cep,
  setCep,
  wantedAddress,
  setWantedAddress,
  error,
  setError
}) {
  function getAddressByCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          setError('CEP não existe ou ele está incorreto.');
          setCep('');
          setWantedAddress('');
        } else {
          setWantedAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`)
          setCep('');
          setError('');
        }
      })
      .catch(() => {
        setWantedAddress('');
        setError('CEP não existe ou ele está incorreto.')
      });
  }

  return (
    <>
      <p className="text">Não sabe o endereço? Digite o CEP e descubra:</p>
      <div className="container-cep">
        <Input
          type="number"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        {cep === '' ? (
          <Button type="primary" disabled icon={<SearchOutlined />} onClick={() => getAddressByCEP(cep)} />
        ) : (
          <Button type="primary" icon={<SearchOutlined />} onClick={() => getAddressByCEP(cep)} />
        )}
      </div>
      {wantedAddress && (
        <p className="text">O endereço é: <strong>{wantedAddress}</strong></p>
      )}
      {error && (
        <p className="text">{error}</p>
      )}
    </>
  )
}