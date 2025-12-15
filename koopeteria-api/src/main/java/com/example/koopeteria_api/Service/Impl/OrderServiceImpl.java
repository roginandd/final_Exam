package com.example.koopeteria_api.Service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.koopeteria_api.DTO.BillResponse;
import com.example.koopeteria_api.DTO.OrderRequest;
import com.example.koopeteria_api.Model.Order;
import com.example.koopeteria_api.Repository.OrderRepository;
import com.example.koopeteria_api.Service.OrderService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Transactional
    public Order addOrder(OrderRequest order) {
        if (order.getOrderName() == null || order.getPrice() == null) {
            throw new IllegalArgumentException("Order name, price, and isDiscounted cannot be null");
        }   

        System.out.println("Is Discounted: " + order.toString());

        if(order.getIsDiscounted() == null){
            order.setIsDiscounted(false);
        }
        if (order.getIsDiscounted() == true)
            order.setIsDiscounted(true);

    

        Order newOrder = Order.builder()
                .orderName(order.getOrderName())
                .price(order.getPrice())
                .isDiscounted(order.getIsDiscounted())
                .build();

        System.out.println("New Order: " + newOrder.toString());

    

        return orderRepository.save(newOrder);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order with id " + id + " not found"));
    }

    public void deleteOrder(Long id) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order with id " + id + " not found"));

        orderRepository.delete(existingOrder);
    }
    public Order updateOrder(Long id, OrderRequest order) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order with id " + id + " not found"));

        if (order.getOrderName() != null) {
            existingOrder.setOrderName(order.getOrderName());
        }
        if (order.getPrice() != null) {
            existingOrder.setPrice(order.getPrice());
        }
        if (order.getIsDiscounted() != null) {
            existingOrder.setIsDiscounted(order.getIsDiscounted());
        }

        return orderRepository.save(existingOrder);
    }

    public BillResponse generateBill() {
        List<Order> orders = orderRepository.findAll();
        double totalBill = 0.0;
        double discountedBill = 0.0;

        for (Order order : orders) {
            totalBill += order.getPrice();
            if (order.getIsDiscounted()) {
                discountedBill += (order.getPrice() * 0.05) - order.getPrice(); 
            } else {
                discountedBill += order.getPrice();
            }
        }

        BillResponse billResponse = new BillResponse();
        billResponse.setRegularBillTotal(totalBill);
        billResponse.setDiscountedBillTotal(Math.abs(discountedBill));

        return billResponse;
    }


    
}
