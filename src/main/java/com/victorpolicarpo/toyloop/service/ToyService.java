package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.entity.Toy;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.exception.UserAlreadyExistsException;
import com.victorpolicarpo.toyloop.mapper.ToyMapper;
import com.victorpolicarpo.toyloop.repository.ToyRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToyService {
    private final ToyRepository toyRepository;
    private final ToyMapper toyMapper;

    public ToyService(ToyRepository toyRepository, ToyMapper toyMapper) {
        this.toyRepository = toyRepository;
        this.toyMapper = toyMapper;
    }

    public void createToy(@Valid ToyRequest dto) {
        if (toyRepository.existsByName(dto.name())){
            throw new UserAlreadyExistsException("A toy with this name already exists.");
        }
        Toy toy = toyMapper.toEntity(dto);
        toyRepository.save(toy);
    }

    public List<ToyResponse> listAll() {
        List<Toy> toyList = toyRepository.findAll();
        return toyMapper.toResponseList(toyList);
    }


    public void updateToy(@Valid ToyUpdate dto, Long id) {
        Toy toy = findById(id);
        toyMapper.updateEntityFromDto(dto, toy);
        toyRepository.save(toy);
    }

    public void delete(Long id) {
        Toy toy = findById(id);
        toyRepository.delete(toy);
    }

    public Toy findById(Long id){
        return toyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("A toy Id not found or not exist.")
        );
    }

}
