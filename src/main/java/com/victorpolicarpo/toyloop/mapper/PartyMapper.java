package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.request.PartyRequest;
import com.victorpolicarpo.toyloop.dto.response.EmployeePartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyResponse;
import com.victorpolicarpo.toyloop.dto.response.PartyToyResponse;
import com.victorpolicarpo.toyloop.entity.Employee;
import com.victorpolicarpo.toyloop.entity.Party;
import com.victorpolicarpo.toyloop.entity.PartyToy;
import com.victorpolicarpo.toyloop.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.UUID;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PartyMapper {

    Party toEntity(PartyRequest dto);
    PartyToy toPartyToy(Party entity);
    PartyResponse toResponse(Party party);
    @Mapping(target = "toyId", source = "toy.toyId")
    @Mapping(target = "name", source = "toy.name")
    @Mapping(target = "quantity", source = "quantity")
    PartyToyResponse toPartyToyResponse(PartyToy partyToy);
    EmployeePartyResponse toEmployeeResponse(Employee employee);

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

