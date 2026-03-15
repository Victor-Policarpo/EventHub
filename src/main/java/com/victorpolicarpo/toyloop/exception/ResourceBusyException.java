package com.victorpolicarpo.toyloop.exception;

import lombok.Getter;

import java.util.List;

@Getter
public class ResourceBusyException extends RuntimeException {
    private final List<ResourceConflict> errors;

    public ResourceBusyException(List<ResourceConflict> errors) {
        super("Business rule validation failed");
        this.errors = errors;
    }

    public ResourceBusyException(ResourceConflict fieldMessage){
        super(fieldMessage.getContentError());
        this.errors = List.of(fieldMessage);
    }
}
