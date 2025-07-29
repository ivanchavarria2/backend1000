import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, age, weight, height } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.age = age ?? user.age;
    user.weight = weight ?? user.weight;
    user.height = height ?? user.height;

    await user.save();
    res.json({ message: 'Perfil actualizado', user });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
  }
};
