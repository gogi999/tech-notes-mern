import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Note from '../models/Note.js';

// @desc Get All Users
// @route GET /users
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {

});

// @desc Create New User
// @route POST /users
// @access Private
export const createNewUser = asyncHandler(async (req, res) => {
    
});

// @desc Update a User
// @route PATCH /users
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    
});

// @desc Delete a User
// @route DELETE /users
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
    
});
