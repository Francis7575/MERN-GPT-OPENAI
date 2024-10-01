import { Typography, Box, Button } from '@mui/material';

type DeleteModalProps = {
  onDelete: () => void
  onCancel: () => void
  setIsModalOpen: (param: boolean) => void
}

const DeleteModal = ({ onDelete, onCancel, setIsModalOpen }: DeleteModalProps) => {

  const handleOverlayClick = () => {
    setIsModalOpen(false)
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDeleteModal = () => {
    setIsModalOpen(false)
    onDelete();
  }

  return (
    <Box component="section" onClick={handleOverlayClick}
      sx={{
        display: "flex", justifyContent: "center", alignItems: "center",
        position: "fixed", inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 1000, 
      }}>
      <Box onClick={handleModalClick}
        sx={{
          backgroundColor: 'white',
          paddingY: 4,
          paddingX: 6,
          borderRadius: '12px',
          boxShadow: 3,
          maxWidth: { xs: '300px', 'md': '500px' },
        }}>
        <Typography component="p" sx={{ color: "black" }}>
          Are you sure you want to delete all chat messages?
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button variant="text" color="success"
            onClick={handleDeleteModal}>
            Yes
          </Button>
          <Button variant="text" color="error"
            onClick={onCancel}>
            No
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default DeleteModal