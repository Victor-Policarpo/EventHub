package com.victorpolicarpo.toyloop.service;

import com.victorpolicarpo.toyloop.dto.request.ToyRequest;
import com.victorpolicarpo.toyloop.dto.response.ToyResponse;
import com.victorpolicarpo.toyloop.dto.update.ToyUpdate;
import com.victorpolicarpo.toyloop.entity.Toy;
import com.victorpolicarpo.toyloop.exception.ResourceNotFoundException;
import com.victorpolicarpo.toyloop.exception.ResourceAlreadyExistsException;
import com.victorpolicarpo.toyloop.mapper.ToyMapper;
import com.victorpolicarpo.toyloop.repository.PartyToyRepository;
import com.victorpolicarpo.toyloop.repository.ToyRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ToyService {
    private final ToyRepository toyRepository;
    private final ToyMapper toyMapper;
    private final PartyToyRepository partyToyRepository;

    public void createToy(@Valid ToyRequest dto) {
        if (toyRepository.existsByName(dto.name())){
            throw new ResourceAlreadyExistsException("A toy with this name already exists.");
        }
        Toy toy = toyMapper.toEntity(dto);
        toyRepository.save(toy);
    }

    public List<ToyResponse> listAllToys(LocalDateTime start, LocalDateTime end) {
        List<Toy> allToys = toyRepository.findAll();

        if (start == null || end == null) {
            return toyMapper.toResponseList(allToys);
        }

        Map<Long, Integer> busyMap = partyToyRepository.findAllOccupiedQuantities(start, end)
                .stream()
                .collect(Collectors.toMap(
                        PartyToyRepository.ToyOccupationProjection::getToyId,
                        PartyToyRepository.ToyOccupationProjection::getOccupiedQty
                ));

        return allToys.stream()
                .map(toy -> {
                    Integer occupied = busyMap.getOrDefault(toy.getToyId(), 0);
                    int available = Math.max(0, toy.getAvailableQuantity() - occupied);

                    return toyMapper.toResponseWithAvailability(toy, available);
                })
                .toList();
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
