package com.example.koopeteria_api.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.koopeteria_api.DTO.BillResponse;
import com.example.koopeteria_api.DTO.OrderRequest;
import com.example.koopeteria_api.DTO.OrderResponse;
import com.example.koopeteria_api.Model.Order;
import com.example.koopeteria_api.Service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/kopeetearia-api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {
    
    private final OrderService orderService;


    @PostMapping("/add-order")
    public ResponseEntity<OrderResponse> addOrder(@RequestBody OrderRequest orderRequest) {
        Order createdOrder = orderService.addOrder(orderRequest);

            
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new OrderResponse(createdOrder,"Order created successfully")
        );
    }    

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/total-bill")
    public ResponseEntity<BillResponse> generateBill() {
        BillResponse bill = orderService.generateBill();
        return ResponseEntity.ok(bill);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Order> updateOrder(@RequestBody OrderRequest orderRequest, @PathVariable Long id) {
        Order updatedOrder = orderService.updateOrder(id, orderRequest);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }   
}