package com.example.koopeteria_api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Object data;

    private String message;
    
}
