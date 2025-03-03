import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Card, CardContent, Typography, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Autocomplete, Avatar } from '@mui/material';
import { MoreVert } from '@mui/icons-material';  // Importing the MoreVert icon
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // Importing Toastify
import 'react-toastify/dist/ReactToastify.css';  // Importing Toastify CSS
import './UserPage.css';
import ProfilePage from '../profile/ProfilePage';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


const UserPage = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [openModal, setOpenModal] = useState(false); // Modal open state
    const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element for handling menu position
    const [selectedPostId, setSelectedPostId] = useState(null); // Store the selected post's ID
    const [openEditModal, setOpenEditModal] = useState(false);  // State for Edit Modal


    const [editCaption, setEditCaption] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [profilePage, setProfilePage] = useState(false)
    const [postPage, setPostPage] = useState(true);
    




    // Fetch posts when the component mounts
    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/auth/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
            
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Error fetching posts');  // Show toast error
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    console.log(posts.length)


    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('caption', caption);

        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/auth/createpost', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Post created successfully!');
            setOpenModal(false);  // Close the modal after posting
            fetchPosts();  // Fetch updated posts

            // Reset the fields after post creation
            setCaption('');  // Clear caption field
            setImage(null);  // Clear the image field
        } catch (error) {
            console.error(error);
            toast.error('Error creating post');
        }
    };


    const handleMenuClick = (event, postId) => {
        console.log(postId)
        setAnchorEl(event.currentTarget);
        setSelectedPostId(postId);  // Set the selected post's ID
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedPostId(null);  // Reset the selected post ID
    };

    const handleEdit = (post) => {
        setEditCaption(post.caption);
        setEditImage(null);  // Reset image for edit
        setOpenEditModal(true);  // Open the Edit Modal
        handleCloseMenu();

        // Now directly pass post._id to handleEditSubmit
        setSelectedPostId(post._id); // You still update the state to keep it in sync
    };
    const handleEditSubmit = async (event) => {


        console.log(selectedPostId)
        event.preventDefault();

        const formData = new FormData();
        formData.append('caption', editCaption);
        console.log(formData)
        if (editImage) formData.append('image', editImage);

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/auth/posts/${selectedPostId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Post updated successfully!');

            setOpenEditModal(false); // Close the edit modal

            fetchPosts();
            // Fetch updated posts
        } catch (error) {
            console.error(error);
            toast.error('Error editing post');
        }

    }
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/auth/delete/${selectedPostId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            toast.success('Post deleted successfully!');
            fetchPosts();

            // Fetch updated posts
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Error deleting post');
        }
        handleCloseMenu();
    };

    const handleProfileClick = () => {
        setProfilePage(true);
        setPostPage(false);
    }
    const handleHomeButton = () => {
        setProfilePage(false);
        setPostPage(true);
    }




    return (
        <Grid>
            {/* Header Section */}
            <Grid display="flex" justifyContent="space-between" alignItems="center" gap={2} sx={{ mb: 2 }}>
                {/* Avatar and Username */}
                <Typography
                    variant='h6'
                    sx={{
                        fontFamily: "initial",
                        cursor: "pointer",
                        ml: 3,
                        display: 'flex', // Ensure avatar is aligned with the text
                        alignItems: 'center', // Align items vertically
                        gap: 1
                    }}
                >
                    {
                        profilePage ? <HomeOutlinedIcon onClick={handleHomeButton} /> :
                            <Avatar src="/broken-image.jpg"
                                sx={{ width: 30, height: 30, bgcolor: "indigo" }}
                                onClick={handleProfileClick}
                            />
                    }


                </Typography>

                {/* Right section containing the search bar and Post button */}
                <Grid sx={{ display: "flex", gap: 2, alignItems: 'center' }}>
                   
                    <Button
                        variant="contained"
                        color="secondary"
                        size='small'
                        sx={{ fontSize: "0.7rem", mr: 3, marginBottom: "auto", marginTop: "auto" }}
                        onClick={() => setOpenModal(true)} // Open modal on click
                    >
                        Post
                    </Button>
                </Grid>
            </Grid>

            {/* Modal for Creating Post */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
                <DialogTitle>Create a Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Caption"
                            variant="outlined"
                            value={caption}
                            onChange={handleCaptionChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ margin: '10px 0', display: 'block' }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Create Post</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal for Editing Post */}
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleEditSubmit}>
                        <TextField
                            label="Caption"
                            variant="outlined"
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            fullWidth
                            margin="normal"

                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditImage(e.target.files[0])}
                            style={{ margin: '10px 0', display: 'block' }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>


            {
                postPage &&

                < Grid sx={{ ml: 3, mr: 3 }}>
                    <Grid container spacing={2}>
                        {posts.map((post) => (
                            <Grid item key={post._id} xs={12} sm={6} md={4}>
                                <Card className="postCard" elevation={3} sx={{ bgcolor: "lavender" }}>
                                    {/* Render the image only if it's available */}
                                    {post.imageUrl && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`http://localhost:5000/${post.imageUrl.replace("\\", "/")}`}
                                            alt="Post Image"
                                        />
                                    )}
                                    <CardContent>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <Typography variant="body2" color="textSecondary" component="p" sx={{ flexGrow: 1 }}>
                                                {post.caption}
                                            </Typography>
                                            <IconButton onClick={(event) => handleMenuClick(event, post._id)}>
                                                <MoreVert />
                                            </IconButton>
                                        </Grid>
                                    </CardContent>
                                </Card>


                                {/* Menu for Edit and Delete */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedPostId === post._id}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={() => handleEdit(post)}>Edit</MenuItem>
                                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                </Menu>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            }


            <Grid sx={{ ml: 3, mr: 3 }}>
                {
                    profilePage && <ProfilePage posts={posts}></ProfilePage>
                }

            </Grid>





            {/* Toast container for notifications */}
            <ToastContainer />
        </Grid >
    );
};

export default UserPage;
