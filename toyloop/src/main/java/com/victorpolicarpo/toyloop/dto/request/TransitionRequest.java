package com.victorpolicarpo.toyloop.dto.request;

import com.victorpolicarpo.toyloop.enums.PartyAction;

public record TransitionRequest(PartyAction action) {
}
