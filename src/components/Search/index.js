import { AutoComplete } from 'antd';
import './styles.css';

export default function Search() {
  return (
    <div className="container-search">
      <AutoComplete style={{ width: '100%' }} placeholder="Buscar" />
    </div>
  )
}