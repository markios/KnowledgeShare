import React, {useRef, useEffect} from 'react';
import './Dialog.css';

const Dialog = ({children, onClose = () => {}}) => {
  const dialogRef = useRef(null)
  const onCloseHandler = () => {
    dialogRef.current.close();
    onClose();
  };
  useEffect(() => dialogRef.current.showModal(), []);
  return (
    <dialog ref={dialogRef} className="dialog" id="dialog">
      <form method="dialog">
        <section className="dialog__content" id="content">
          {children}
        </section>
        <menu className="dialog__menu">
          <button id="close" onClick={onCloseHandler} className="dialog__menu__button" type="reset">Close</button>
        </menu>
      </form> 
    </dialog>
  )
};

export default Dialog;