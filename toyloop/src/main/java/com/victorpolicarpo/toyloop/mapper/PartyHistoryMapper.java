package com.victorpolicarpo.toyloop.mapper;

import com.victorpolicarpo.toyloop.dto.response.PartyHistoryResponse;
import com.victorpolicarpo.toyloop.dto.response.UserSimpleResponse;
import com.victorpolicarpo.toyloop.entity.PartyHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PartyHistoryMapper {
    @Mapping(target = "id", source = "history.id")
    @Mapping(target = "action", source = "history.action")
    @Mapping(target = "performedAt", source = "history.performedAt")
    @Mapping(target = "performedBy", source = "userSimple")
    PartyHistoryResponse toResponse(PartyHistory history, UserSimpleResponse userSimple);
}
