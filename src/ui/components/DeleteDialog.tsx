import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export interface DeleteDialogProps {
    id: string;
    keepMounted: boolean;
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
  }

export function DeleteDialog(props: DeleteDialogProps) {
    const { onClose, open, onDelete, ...other } = props;
  
    const handleCancel = () => {
      onClose();
    };
  
    const handleOk = () => {
      onClose();
      onDelete();
    };
  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        {...other}
      >
        <DialogTitle color="primary">Are you sure?</DialogTitle>
        <DialogContent dividers>
            <p>
                Do you want to delete this booking?
            </p>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk} color="error">Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }