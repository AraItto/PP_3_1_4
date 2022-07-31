package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.Collection;
import java.util.List;

public interface RoleService {

    Role getRoleById(long id);

    List<Role> getSetOfRoles (List <String> rolesId);

    Collection<Role> getRoleList();
}
