package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeePartyResponse;
import com.victorpolicarpo.toyloop.dto.response.ListPartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyToyResponse;
import com.victorpolicarpo.toyloop.dto.update.PartyUpdate;
import com.victorpolicarpo.toyloop.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PartyMapper {

    Party toEntity(PartyRequest dto);
    PartyToy toPartyToy(Party entity);
    PartyResponse toResponse(Party party);
    @Mapping(target = "toyId", source = "toy")
    @Mapping(target = "name", source = "toy")
    @Mapping(target = "quantity", source = "quantity")
    PartyToyResponse toPartyToyResponse(PartyToy partyToy);

    default Long mapToyId(Toy toy) {
        return (toy != null) ? toy.getToyId() : null;
    }

    default String mapToyName(Toy toy){
        return (toy != null) ? toy.getName() : "Toy Unavailable";
    }

    EmployeePartyResponse toEmployeeResponse(Employee employee);
    ListPartyResponse toListPartyResponse(Party entity);
    void updateEntityFromDto(PartyUpdate dto, @MappingTarget Party entity);

    default User map(UUID value) {
        if (value == null) return null;
        User user = new User();
        user.setUserId(value);
        return user;
    }

    default UUID map(User value) {
        if (value == null) return null;
        return value.getUserId();
    }

}

