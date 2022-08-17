package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserServiceImpl userService;

    public AdminRestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public List<User> getAllUsers() {
        return userService.getListUsers();
    }

    @GetMapping()
    public UserDetails userView(@AuthenticationPrincipal UserDetails currentUser) {
        return userService.loadUserByUsername(currentUser.getUsername());
    }

    @PostMapping("/admin")
    public User saveUser(@RequestBody User user) {
        user.getRoles().forEach(role -> System.out.println(role.getName()));
        userService.addUser(user);
        user.getRoles().forEach(role -> System.out.println(role.getName()));
        return user;
    }

    @PatchMapping("/admin")
    public void updateUser(@RequestBody User user) {;
        System.out.println(user);
        System.out.println(user.getRoles().size());
        userService.updateUser(user);
//        return user;
    }

    @DeleteMapping("/admin/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        System.out.println(id);
        userService.deleteUserById(id);
    }
}
