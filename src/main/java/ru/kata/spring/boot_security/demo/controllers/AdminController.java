package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String printUsers(@AuthenticationPrincipal UserDetails currentUser, Model model) {
//        model.addAttribute("users", userService.getListUsers());
        model.addAttribute("currentUser", currentUser);
//        model.addAttribute("roles", roleService.getRoleList());
//        model.addAttribute("user", user);
        return "admin";
    }

//    @PostMapping("/saveUser")
//    public String saveUser(User user, @RequestParam("role") List<String> role){
//        Collection<Role> roleList = roleService.getSetOfRoles(role);
//        user.setRoles(roleList);
//        userService.addUser(user);
//        return "redirect:/admin";
//    }

//    @RequestMapping("/deleteUser/{id}")
//    public String deleteUser(@PathVariable("id") long userId) {
//        userService.deleteUserById(userId);
//        return "redirect:/admin";
//    }
}
