import styled from 'styled-components'

const Button = styled.a`


.dropdown {
  display: inline-block;
  position: relative;
  border:none;
  padding: 10px
}

.menu{
  color: var(--secundaria);
 font-size: 30px;
 line-height: 0
 
}

.dropdown-options {
  display: none;
  position: absolute;
  margin-top: 10px;
  overflow: auto;
  background-color: var(--leve);
  border-radius: 10px
}

.dropdown:hover .dropdown-options {
  display: block;
}

.dropdown-options a {
  display: block;
  color: white;
  padding: 5px;
  text-decoration: none;
  padding:20px 40px;
}

.dropdown-options a:hover {
  color: #0a0a23;
  background-color: #ddd;
  border-radius:5px;
}
`

export {Button}