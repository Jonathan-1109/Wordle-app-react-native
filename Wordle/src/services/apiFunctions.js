import api from "../api/api.js";

export const fetchData = async (mode) => {
    try {
        const response = await api.get(`/data/class/${mode}`);
        return response.data.best
    } catch (err) {
        throw new Error("Error in classification")
    }
}

export const profileData = async (id) => {
    try {
        const response = await api.get(`/data/getData/${id}`);
        return response.data.values
      } catch (err) {   
        throw new Error("Error in profile")
      }
}

export const login = async (name,password) => {
    const data = {
      name: name.trim(),
      password: password
    }
    try {
        const response = await api.post('/users/login', data)
        return response.data
    } catch (err) {
        throw new Error("Error in login")
    }
}

export const register = async (name,email,password,confirmPassword) => {
    const content = {
      name: name.trim(),
      mail: email.trim(),
      password: password,
      confirmPassword: confirmPassword
    }
    try {
        const response = await api.post('/users/register', content)
        return response.data
    } catch (err) {
        throw new Error("Error in register")
    }
}

export const updateData = async (id,status,points,mode) => {
    const data = {
        win: status === 'winner' ? 1  : 0,
        points: points,
        mode: mode
    }
    try {
        await api.put(`/data/newData/${id}`, data)
        return
    } catch (err) {
        throw new Error("Error in update")
    }
}