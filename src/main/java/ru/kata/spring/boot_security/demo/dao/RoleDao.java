package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.Collection;

public interface RoleDao {

    Role getRoleById(long id);

    Collection<Role> getRoleList();
}
