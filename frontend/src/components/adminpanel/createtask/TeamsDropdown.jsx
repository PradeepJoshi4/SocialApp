import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';
import { useState } from 'react';

export default function ComboBox() {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    // Dummy data for the autocomplete
    const teamNames = [
        { title: 'open' },
        { title: 'Tech sales' },
        { title: 'Watsonx AI' },
        { title: 'KPIT' },
        { title: 'Green DC' },
    ];

    // Team members associated with each team
    const teamMembers = {
        open: ['Neo', 'Trinity', 'Morpheus'],
        'Tech sales': ['John Doe', 'Jane Smith', 'Bill Gates'],
        'Watsonx AI': ['Alice', 'Bob', 'Charlie'],
        KPIT: ['David', 'Emily', 'Frank'],
        'Green DC': ['George', 'Helen', 'Isaac'],
    };

    // Function to get members based on the selected team
    const getTeamMembers = (team) => {
        return teamMembers[team] || [];
    };

    // Function to get the team based on the selected member
    const getTeamByMember = (member) => {
        for (let team in teamMembers) {
            if (teamMembers[team].includes(member)) {
                return team;
            }
        }
        return null;
    };

    // Get all team members (in case no team is selected)
    const allTeamMembers = Object.values(teamMembers).flat();

    return (
        <Grid sx={{ display: "flex", gap: 2 }}>
            <Autocomplete
                disablePortal
                sx={{ width: 200 }}
                options={teamNames}
                getOptionLabel={(option) => option.title}
                value={selectedTeam ? { title: selectedTeam } : null}
                onChange={(event, newValue) => {
                    setSelectedTeam(newValue ? newValue.title : null); // Only store team name as string
                    setSelectedMember(null); // Clear member selection when team changes
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Team"
                        InputLabelProps={{
                            ...params.InputLabelProps,
                            sx: { fontSize: '0.8rem' }, // Reduce the label font size
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: '0.875rem', // Reduce the value font size
                            }
                        }}
                    />
                )}
                size="small"
            />
            <Autocomplete
                disablePortal
                sx={{ width: 200 }}
                options={selectedTeam ? getTeamMembers(selectedTeam) : allTeamMembers} // Show all members if no team is selected
                getOptionLabel={(option) => option}
                value={selectedMember}
                onChange={(event, newValue) => {
                    setSelectedMember(newValue);
                    setSelectedTeam(getTeamByMember(newValue)); // Set team based on selected member
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Team Members"
                        InputLabelProps={{
                            ...params.InputLabelProps,
                            sx: { fontSize: '0.8rem' }, // Reduce the label font size
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                fontSize: '0.875rem', // Reduce the value font size
                            }
                        }}
                    />
                )}
                size="small"
            />
        </Grid>
    );
}
