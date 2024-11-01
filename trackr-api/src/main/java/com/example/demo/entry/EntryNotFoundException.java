package com.example.demo.entry;

public class EntryNotFoundException extends RuntimeException{

    public EntryNotFoundException(String errMessage){
        super(errMessage);
    }
}
