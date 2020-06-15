import React from 'react';
export function LoginRegisterComponent(props) {
  return (
      <React.Fragment>
          <div>Not logged in</div>
          <form>
              <label htmlFor="">Email</label>
              <input type="text" placeholder="e-mail" />
              <label>Password</label>
              <input type="password" placeholder="password" />
              <button>Log in</button>
          </form>
      </React.Fragment>
  )
}
