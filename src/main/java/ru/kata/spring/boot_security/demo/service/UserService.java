package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public interface UserService {

    void addUser(User user);

    List<User> getListUsers();

    User getUserById(long id);

    void deleteUserById(long id);

}
