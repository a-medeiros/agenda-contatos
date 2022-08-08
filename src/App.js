import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateNewContact from './components/CreateNewContact';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import './App.css';

const { Option } = Select;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [wantedContact, setWantedContact] = useState('');

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('contacts')) || [];
    data.sort((name1, name2) => {
      return name1.fullName < name2.fullName ? -1 : name1.fullName > name2.fullName ? 1 : 0;
    });
    setContacts(data);
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-contacts">
          <div style={{ margin: '20px 0px 30px' }}>
            <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsModalVisible(true)}>Novo Contato</Button>
            <CreateNewContact
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              contacts={contacts}
              setContacts={setContacts}
            />
          </div>

          <div className="container-search">
            <Select
              showSearch
              allowClear
              placeholder="Buscar..."
              style={{ width: '100%' }}
              optionFilterProp="children"
              onChange={(value) => setWantedContact(value)}
              onClear={() => setWantedContact('')}
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {contacts.map((contact) => {
                return (
                  <Option
                    key={contact.fullName}
                  >
                    {contact.fullName}
                  </Option>
                )
              })}
            </Select>
          </div>

          <ul className="contacts-list">
            {contacts.length === 0 ? (
              <div>
                <p>Você não tem nenhum contato na sua agenda!</p>
              </div>
            ) : (
              <div>
                <li className="contact-list-header">
                  <h3>Nome</h3>
                  <h3 className='contact-header-hide-number'>Número de Telefone</h3>
                  <h3 className='contact-header-hide-address'>Endereço</h3>
                </li>
                {contacts.filter((contact) => {
                  if (!wantedContact) {
                    return contact;
                  } else {
                    return contact.fullName.includes(wantedContact);
                  }
                }).map((contact) => (
                  <li className="contact">
                    <p className="contact-value">{contact.name} {contact.lastName}</p>
                    <p className="contact-value contact-header-hide-number">{contact.telephone[0].number}</p>
                    <p className="contact-value contact-header-hide-address">{contact.address[0].address}</p>
                  </li>
                ))}
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
