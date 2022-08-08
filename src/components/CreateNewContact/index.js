import React, { useState } from 'react';
import './styles.css';
import { Modal, Button, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import SearchAddress from '../SearchAddress';

export default function CreateNewContact({ isModalVisible, setIsModalVisible, contacts, setContacts }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState([
    { number: '' },
  ]);
  const [addresses, setAddresses] = useState([
    { address: '' },
  ])
  const [cep, setCep] = useState('');
  const [wantedAddress, setWantedAddress] = useState(null);

  function success() {
    message.success('Contato foi criado!');
  };

  function handleCancel() {
    setIsModalVisible(false);
    setName('');
    setLastName('');
    setPhoneNumber([{ number: '' }]);
    setAddresses([{ address: '' }]);
    setCep('');
    setWantedAddress(null);
  };

  // Phone Number
  function addNewPhoneNumber() {
    setPhoneNumber([...phoneNumber, { number: '' }])
  }

  function changeSelectedPhoneNumber(e, index) {
    const list = [...phoneNumber];
    list[index].number = e.target.value;
    setPhoneNumber(list);
  }

  function removePhoneNumberField(index) {
    const list = [...phoneNumber];
    list.splice(index, 1);
    setPhoneNumber(list);
  }

  // Address
  function addNewAddress() {
    setAddresses([...addresses, { address: '' }]);
  }

  function changeSelectedAddress(e, index) {
    const list = [...addresses];
    list[index].address = e.target.value;
    setAddresses(list);
  }

  function removeAddressField(index) {
    const list = [...addresses];
    list.splice(index, 1);
    setAddresses(list);
  }

  // Submit
  function onSubmit(e) {
    e.preventDefault();
    let contactsData = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts([...contacts, {
      name,
      lastName,
      fullName: `${name} ${lastName}`,
      telephone: phoneNumber,
      address: addresses
    }]);
    contactsData.push({
      name,
      lastName,
      fullName: `${name} ${lastName}`,
      telephone: phoneNumber,
      address: addresses
    });
    localStorage.setItem('contacts', JSON.stringify(contactsData));

    success();
    setName('');
    setLastName('');
    setPhoneNumber([{ number: '' }]);
    setAddresses([{ address: '' }]);
    setCep('');
    setWantedAddress(null);
    setIsModalVisible(false);
  }

  return (
    <>
      <Modal title="Novo Contato" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <form onSubmit={onSubmit}>
          <div className="container-input">
            <label>Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="container-input">
            <label>Sobrenome</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="container-input">
            <label>Telefone</label>
            {phoneNumber.map((phone, index) => (
              <div className="input">
                <Input
                  style={{ width: '85%' }}
                  value={phone.number}
                  onChange={(e) => changeSelectedPhoneNumber(e, index)}
                />
                {index !== 0 && (
                  <div className="container-icon">
                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => removePhoneNumberField(index)} />
                  </div>
                )}
              </div>
            ))}
            <div className="container-button">
              <Button
                type="primary"
                onClick={addNewPhoneNumber}
              >
                + Adicionar telefone
              </Button>
            </div>
          </div>
          <div className="container-input">
            <label>Endereço</label>

            <SearchAddress
              cep={cep}
              setCep={setCep}
              wantedAddress={wantedAddress}
              setWantedAddress={setWantedAddress}
            />

            {addresses.map((address, index) => (
              <div className="input">
                <Input
                  style={{ width: '85%' }}
                  value={address.address}
                  onChange={(e) => changeSelectedAddress(e, index)}
                />
                {index !== 0 && (
                  <div className="container-icon">
                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => removeAddressField(index)} />
                  </div>
                )}
              </div>
            ))}
            <div className="container-button">
              <Button
                type="primary"
                onClick={addNewAddress}
              >
                + Adicionar endereço
              </Button>
            </div>
          </div>
          <div className="footer">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button type="primary" htmlType="submit">Salvar</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}