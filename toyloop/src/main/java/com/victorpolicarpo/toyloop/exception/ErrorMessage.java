package com.victorpolicarpo.toyloop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorMessage {
    private String titleError;
    private String contentError;
}
