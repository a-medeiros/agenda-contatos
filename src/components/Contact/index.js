import { Modal } from 'antd';
import './styles.css';

export default function Contact({
  isContactModalVisible,
  setIsContactModalVisible,
  selectedContact
}) {
  function handleCancel() {
    setIsContactModalVisible(false);
  }

  return (
    <Modal title="Contato" visible={isContactModalVisible} onCancel={handleCancel} footer={null}>
      <h3>{selectedContact?.name}</h3>
      {selectedContact?.phoneNumbers.length > 0 && (
        <div>
          <p>Número(s) de telefone:</p>
          <ul>
            {selectedContact?.phoneNumbers.map((phoneNumber) => (
              <li className="list-item">{phoneNumber.number}</li>
            ))}
          </ul>
        </div>
      )}
      {selectedContact?.addresses.length > 0 && (
        <div>
          <p>Endereço(s):</p>
          <ul>
            {selectedContact?.addresses.map((address) => (
              <li className="list-item">{address.address}</li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  )
}