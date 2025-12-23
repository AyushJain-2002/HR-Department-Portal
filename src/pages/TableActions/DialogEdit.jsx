import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react'; // Adjust imports based on your library
import FormDynamic from './FormDynamic';
// import FormDynamic from './FormDynamic'; // Assuming this component is being used for the form rendering

const DialogEdit = ({openModal,
    setOpenModal,
    editFields,
    handleEditSubmit,
    handleFieldChange,
    resetAfterSubmit,
    formState,
    storeLabel,
    isEditMode,
    branchToEdit,}) => {
  return (
    <Dialog size="lg" open={openModal} handler={() => setOpenModal(false)}>
      <DialogHeader className="pb-0">Edit Branch</DialogHeader>
      <DialogBody className="pt-0">
        <FormDynamic
          fields={editFields}
          onSubmit={handleEditSubmit}
          onChange={handleFieldChange}
          resetAfterSubmit={resetAfterSubmit}
          storeLabel={storeLabel}
          initialValues={branchToEdit ? formState : {}}
          isEditMode={isEditMode}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setOpenModal(false)}
          className="mr-1 bg-gray-200 text-md font-semibold"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="blue"
          className="text-md font-semibold"
          onClick={() => handleEditSubmit(formState)}
        >
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default DialogEdit