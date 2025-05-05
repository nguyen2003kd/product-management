const RoleModel = require('../../models/roles.model');
//[GET] /admin/roles
module.exports.index = async (req, res) => {
    try {
        const find={
            deleted: false
        }
        const roles = await RoleModel.find(find);
        res.render('admin/pages/roles/index', {
            pageTitle: 'Quản lý quyền',
            roles: roles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    try {
        res.render('admin/pages/roles/create', {
            pageTitle: 'Thêm quyền mới',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
//[POST] /admin/roles/create
module.exports.postCreate = async (req, res) => {
    try {
        const { title, description, permissions } = req.body;
        const newRole = new RoleModel({
            title,
            description,
            permissions: permissions || [],
        });
        await newRole.save();
        req.flash('info', 'thêm thành công');
        res.redirect('/admin/roles');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await RoleModel.findById(id);
        if (!role) {
            return res.status(404).send('Role not found');
        }
        res.render('admin/pages/roles/edit', {
            pageTitle: 'Chỉnh sửa quyền',
            role: role,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
//[PATCH] /admin/roles/edit/:id
module.exports.patchEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, permissions } = req.body;
        const updatedRole = await RoleModel.findByIdAndUpdate(id, {
            title,
            description,
            permissions: permissions || [],
        });
        if (!updatedRole) {
            return res.status(404).send('Role not found');
        }
        req.flash('info', 'chỉnh sửa thành công');
        res.redirect('/admin/roles');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
//[GET] /admin/roles/permission
module.exports.permission = async (req, res) => {
    try {
        const find={
            deleted: false
        }
        const roles = await RoleModel.find(find);
        res.render('admin/pages/roles/permission', {
            pageTitle: 'Quản lý quyền',
            role: roles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}
//[PATCH] /admin/roles/permission
module.exports.patchPermission = async (req, res) => {
        const permission = JSON.parse(req.body.permission);
        if(permission){
            permission.forEach(async (item) => {
                const id = item.id;
                const permissions = item.permission;
                await RoleModel.findByIdAndUpdate(id, {
                    permissions: permissions || [],
                });
            });
        }
        req.flash('info', 'cập nhật quyền thành công');
        res.redirect('/admin/roles/permission');
}