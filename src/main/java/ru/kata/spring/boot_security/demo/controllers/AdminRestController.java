package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

    private final UserServiceImpl userService;

    public AdminRestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> getAllUsers() {
        return userService.getListUsers();
    }

    @GetMapping("/currentUser")
    public UserDetails userView(@AuthenticationPrincipal UserDetails currentUser) {
        return userService.loadUserByUsername(currentUser.getUsername());
    }

//    @PostMapping()
//    public User saveUser(@RequestBody User user) {
//        userService.addUser(user);
//        return user;
//    }

    @PatchMapping("/user")
    public User saveUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        System.out.println(id);
        userService.deleteUserById(id);
    }
}
