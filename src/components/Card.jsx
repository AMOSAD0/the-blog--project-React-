import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import logo from '../assets/logo.svg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {
    Box, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { useState } from 'react';

export default function MultiActionAreaCard({ title, description, image, userId, userName, onDelete , postId}) {
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };
    return (
        <>
            <Card sx={{ maxWidth: 845, border: "solid 1px", borderColor: "#FF5678", p: 1, mb: 2 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"

                        image={image}
                        alt="post image"
                        sx={{ border: "solid 1px", borderColor: "#FF5678", p: 1, px: 2, borderRadius: 1 }}
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: "solid 1px",
                    color: "#FF5678"

                }}>
                    <Typography variant="body1">
                        {userName}
                    </Typography>
                    {userId == localStorage.getItem('token') && (<Box>
                        <Button onClick={() => navigate(`/edit/${postId}`)} variant='outlined' size="small" color="info" sx={{ mr: 1 }}>
                            <EditIcon sx={{ mr: 1 }} />
                            Edit
                        </Button>
                        <Button onClick={handleDeleteClick} variant="outlined" size="small" color="error" sx={{ mr: 1 }}>
                            <DeleteOutlineIcon sx={{ mr: 1 }} />
                            Delete
                        </Button>

                    </Box>)}

                </CardActions>
            </Card>
         
            <Dialog open={openDialog} onClose={handleCancel}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" >
                        Yes, delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
