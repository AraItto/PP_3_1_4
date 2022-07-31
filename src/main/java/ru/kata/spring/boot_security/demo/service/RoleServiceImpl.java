package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService{

    private RoleDao roleDao;

    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Role getRoleById(long id) {
        return roleDao.getRoleById(id);
    }

    @Override
    public List<Role> getSetOfRoles (List <String> rolesId) {
        List<Role> roleSet = new ArrayList<>();
        for (String id : rolesId) {
            roleSet.add(roleDao.getRoleById(Integer.parseInt(id)));
        }
        return roleSet;
    }

    @Override
    public Collection<Role> getRoleList() {
        return roleDao.getRoleList();
    }
}
