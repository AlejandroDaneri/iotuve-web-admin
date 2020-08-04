/* Import Libs */
import React from 'react'
import { StyledModal } from '../styles/ModalStyled'
import { Button } from '@material-ui/core'
import { COLOR_PRIMARY } from '../constants'

const DeleteModal = ({
  name,
  resource,
  modalOpen,
  changeModalOpen,
  remove
}) => {
  return (
    <StyledModal
      isOpen={modalOpen}
      onBackgroundClick={() => changeModalOpen(false)}
      onEscapeKeydown={null}
    >
      <span>
        ¿Está seguro que desea borrar el {resource} <b>{name}</b>?
      </span>
      <div className='actions'>
        <Button
          variant='contained'
          style={{ backgroundColor: COLOR_PRIMARY }}
          onClick={() => changeModalOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          style={{ backgroundColor: COLOR_PRIMARY }}
          onClick={remove}
        >
          Aceptar
        </Button>
      </div>
    </StyledModal>
  )
}

export default DeleteModal
