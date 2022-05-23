import React from 'react'
import styled from 'styled-components'
import Robot from '../asset/robot.gif'
import Logout from './Logout'

const Welcome = ({currentUser}) => {
  return (
      <Container>
        <div className='button-logout'>
            <Logout/>
        </div>
        <div>
          <img src={Robot} alt="Robot" />
          <h1>
             Welcome, <span>{currentUser?.username}!</span>
          </h1>
              <h3>Please select a chat to Start Messaging.</h3>
        </div>
      </Container>
  )
}

const Container = styled.div`
display:grid;
grid-template-rows: 10% 90%;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;

img {
    height:20rem;
}
span {
    color: #4e0eff;
}
.button-logout {
    position: relative;
    display: flex;
    justify-content: flex-end;
    left: 300px;
}
`;

export default Welcome