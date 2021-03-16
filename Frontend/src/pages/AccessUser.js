import React from 'react';
import Forms from '../components/Forms';
import PanelControlForms from '../components/PanelControlForms';


const AccessUser=()=>{
    const transition=()=>{
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
      
        sign_up_btn.addEventListener("click", () => {
          container.classList.add("sign-up-mode");
        });
      
        sign_in_btn.addEventListener("click", () => {
          container.classList.remove("sign-up-mode");
        });
        
      }
    return (
        <div onMouseOver={transition} className="container">
            <Forms/>
            <PanelControlForms/>
        </div>
    );
}

export default AccessUser;