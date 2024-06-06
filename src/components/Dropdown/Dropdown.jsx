import { Link } from 'react-router-dom';
import { Button } from './Style'
import { RiMenuFill } from 'react-icons/ri';

const Dropdown = () => (

<Button>
  <div class="dropdown">
    <div className='menu'>
      <RiMenuFill/>
    </div>
    <div class="dropdown-options">
    <Link to="/">Home</Link>

      <Link to="/clinica">Dosimetria Clinica</Link>
      <Link to="/dosimetriapreclinica">Dosimetria Pré-Clinica</Link>
      <Link to="/modelagem">Modelagem Computacional</Link>
      <Link to="/radiosinoviortese">Radiosinoviortese</Link>
      <Link to="/segmentacaoequantificacao">Segmentação e Quantificação</Link>
    </div>
  </div>
</Button>
    
)

export default Dropdown;